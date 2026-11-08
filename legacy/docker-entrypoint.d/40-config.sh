#!/bin/sh
# Writes /tmp/config.js from environment variables so the same image works anywhere.
# /tmp is used (not the web root) so the container can run with a read-only root filesystem.
set -eu
esc() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'; }
cat > /tmp/config.js <<EOF
window.__CONFIG__ = {
  API_URL: "$(esc "${API_URL:-}")",
  GRAFANA_URL: "$(esc "${GRAFANA_URL:-}")"
};
EOF
