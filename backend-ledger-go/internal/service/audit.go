package service

import (
	"sync"
	"time"

	"github.com/waqfi/backend-ledger-go/internal/model"
	"go.uber.org/zap"
)

// AuditService provides an append-only, in-memory audit log.
// In production, replace the slice with PostgreSQL writes via sqlx.
type AuditService struct {
	mu     sync.RWMutex
	events []model.AuditEvent
	logger *zap.Logger
}

func NewAuditService(logger *zap.Logger) *AuditService {
	return &AuditService{
		events: make([]model.AuditEvent, 0, 1024),
		logger: logger,
	}
}

// Record appends an immutable audit event.
func (s *AuditService) Record(evt model.AuditEvent) {
	s.mu.Lock()
	defer s.mu.Unlock()

	evt.CreatedAt = time.Now().UTC()
	if evt.Timestamp.IsZero() {
		evt.Timestamp = evt.CreatedAt
	}
	evt.ID = time.Now().Format("20060102150405.000000000")

	s.events = append(s.events, evt)
	s.logger.Info("Audit event recorded",
		zap.String("id", evt.ID),
		zap.String("type", evt.Type),
		zap.String("wallet", evt.WalletAddress),
		zap.String("txHash", evt.TxHash),
	)
}

// List returns all events, optionally filtered by type.
func (s *AuditService) List(eventType string) []model.AuditEvent {
	s.mu.RLock()
	defer s.mu.RUnlock()

	if eventType == "" {
		result := make([]model.AuditEvent, len(s.events))
		copy(result, s.events)
		return result
	}

	var filtered []model.AuditEvent
	for _, e := range s.events {
		if e.Type == eventType {
			filtered = append(filtered, e)
		}
	}
	return filtered
}

// GenerateComplianceReport builds a report for the BWI / Agentic AI consumer.
func (s *AuditService) GenerateComplianceReport(from, to time.Time) model.ComplianceReport {
	s.mu.RLock()
	defer s.mu.RUnlock()

	report := model.ComplianceReport{
		GeneratedAt:  time.Now().UTC(),
		PeriodStart:  from,
		PeriodEnd:    to,
		EventsByType: make(map[string]int64),
	}

	var flags []string

	for _, e := range s.events {
		if e.Timestamp.Before(from) || e.Timestamp.After(to) {
			continue
		}

		report.EventsByType[e.Type]++

		switch e.Type {
		case "MINT":
			report.TotalMints++
		case "TRANSFER":
			report.TotalTransfers++
		case "KYC_WHITELIST":
			report.TotalKYCEvents++
		case "ROI_DISTRIBUTION":
			report.TotalROIPayouts++
		}

		// Keep last 50 events in report
		if len(report.RecentEvents) < 50 {
			report.RecentEvents = append(report.RecentEvents, e)
		}
	}

	// Basic AML heuristic flags
	if report.TotalMints > 0 && report.TotalKYCEvents == 0 {
		flags = append(flags, "MINTS_WITHOUT_KYC: minting occurred without any KYC events in period")
	}

	if len(flags) > 0 {
		report.ComplianceStatus = "REVIEW_NEEDED"
		report.Flags = flags
	} else {
		report.ComplianceStatus = "COMPLIANT"
	}

	return report
}
