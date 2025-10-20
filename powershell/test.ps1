$body = '{ "email": "user@example.com", "theName": "string", "subject": "string", "question": "string" }'

1..10 | ForEach-Object {
    Start-Job {
        Invoke-WebRequest -Uri "https://localhost:7168/api/siterequests" `
                          -Method POST `
                          -ContentType "application/json" `
                          -Body $using:body `
                          -SkipCertificateCheck `
                          -ErrorAction SilentlyContinue |
        Select-Object StatusCode, Content
    }
} | Receive-Job -Wait -AutoRemoveJob
