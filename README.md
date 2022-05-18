# FPID Demo
This demo website aims to demonstrate the implementation of FPID using the Adobe WebSDK.

## Steps to reproduce
1. Install Adobe Experience Cloud Debugger
2. Under Tags/Configuration/Add New Embedd Code add a script tag to your WebSDK property
3. Validate the data ingestion
4. Note the ECID
5. Delete all marketing cookies (but the FPID)
6. After page refresh same ECID should be recreated
7. Delete all cookies (including FPID)
8. Note new ECID
