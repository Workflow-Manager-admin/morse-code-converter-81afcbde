#!/bin/bash
cd /home/kavia/workspace/code-generation/morse-code-converter-81afcbde/morse_code_converter_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

