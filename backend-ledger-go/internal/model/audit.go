package model

import "time"

// AuditEvent represents an immutable GRC audit record.
// Every state change in the WaqFi system produces one of these.
type AuditEvent struct {
	ID            string    `json:"id" db:"id"`
	Type          string    `json:"type" db:"type"`                       // MINT, KYC_WHITELIST, TRANSFER, ROI_DISTRIBUTION
	Source        string    `json:"source" db:"source"`                   // xendit, midtrans, admin, system
	PaymentRef    string    `json:"paymentRef,omitempty" db:"payment_ref"`
	WalletAddress string    `json:"walletAddress" db:"wallet_address"`
	Partition     string    `json:"partition,omitempty" db:"partition"`
	Fractions     int64     `json:"fractions,omitempty" db:"fractions"`
	TxHash        string    `json:"txHash,omitempty" db:"tx_hash"`
	Metadata      string    `json:"metadata,omitempty" db:"metadata"`     // JSON blob for extensible fields
	Timestamp     time.Time `json:"timestamp" db:"timestamp"`
	CreatedAt     time.Time `json:"createdAt" db:"created_at"`
}

// ComplianceReport is the structure consumed by the Agentic AI command center
// and BWI reporting pipelines.
type ComplianceReport struct {
	GeneratedAt       time.Time       `json:"generatedAt"`
	PeriodStart       time.Time       `json:"periodStart"`
	PeriodEnd         time.Time       `json:"periodEnd"`
	TotalMints        int64           `json:"totalMints"`
	TotalTransfers    int64           `json:"totalTransfers"`
	TotalKYCEvents    int64           `json:"totalKycEvents"`
	TotalROIPayouts   int64           `json:"totalRoiPayouts"`
	EventsByType      map[string]int64 `json:"eventsByType"`
	RecentEvents      []AuditEvent    `json:"recentEvents"`
	ComplianceStatus  string          `json:"complianceStatus"` // COMPLIANT, REVIEW_NEEDED, FLAGGED
	Flags             []string        `json:"flags,omitempty"`
}
