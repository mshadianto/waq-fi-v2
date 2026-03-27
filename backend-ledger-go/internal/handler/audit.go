package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/waqfi/backend-ledger-go/internal/model"
	"github.com/waqfi/backend-ledger-go/internal/service"
	"go.uber.org/zap"
)

type AuditHandler struct {
	svc    *service.AuditService
	logger *zap.Logger
}

func NewAuditHandler(svc *service.AuditService, logger *zap.Logger) *AuditHandler {
	return &AuditHandler{svc: svc, logger: logger}
}

// RecordEvent handles POST /api/v1/audit/events
func (h *AuditHandler) RecordEvent(w http.ResponseWriter, r *http.Request) {
	var evt model.AuditEvent
	if err := json.NewDecoder(r.Body).Decode(&evt); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	if evt.Type == "" || evt.WalletAddress == "" {
		http.Error(w, `{"error":"type and walletAddress are required"}`, http.StatusBadRequest)
		return
	}

	h.svc.Record(evt)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "recorded"})
}

// ListEvents handles GET /api/v1/audit/events?type=MINT
func (h *AuditHandler) ListEvents(w http.ResponseWriter, r *http.Request) {
	eventType := r.URL.Query().Get("type")
	events := h.svc.List(eventType)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"count":  len(events),
		"events": events,
	})
}

// ComplianceReport handles GET /api/v1/audit/compliance-report
// Query params: from, to (RFC3339). Defaults to last 30 days.
// This endpoint is designed to be consumed by the Agentic AI command center
// for automated DSN-MUI / BWI compliance auditing.
func (h *AuditHandler) ComplianceReport(w http.ResponseWriter, r *http.Request) {
	now := time.Now().UTC()
	from := now.AddDate(0, 0, -30)
	to := now

	if v := r.URL.Query().Get("from"); v != "" {
		if t, err := time.Parse(time.RFC3339, v); err == nil {
			from = t
		}
	}
	if v := r.URL.Query().Get("to"); v != "" {
		if t, err := time.Parse(time.RFC3339, v); err == nil {
			to = t
		}
	}

	report := h.svc.GenerateComplianceReport(from, to)

	h.logger.Info("Compliance report generated",
		zap.String("status", report.ComplianceStatus),
		zap.Int64("totalMints", report.TotalMints),
		zap.Int64("totalKYC", report.TotalKYCEvents),
	)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(report)
}
