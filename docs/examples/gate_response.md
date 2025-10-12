# Example PR comment — Gate Response

Paste the following YAML in a PR comment (as a reply to the request):

```yaml
gate_response:
  id: PROD_SECRETS_ACCESS
  pr: 123
  decision: approve
  approved_by: "owner"
  expires_at: "2025-10-15T10:00:00Z"
  notes: "Only deploy workflow, no config edits."
```
