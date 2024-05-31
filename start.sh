#!/bin/bash

# Start api
cd /project/api && pdm run python -m uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000 &

wait -n
exit $?