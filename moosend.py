import requests


# to create subscriber
params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json","MailingListID":"8b1f6035-1b1f-4edb-aa88-ccc080846a58"}
payload = {
  "Email": "arshi.khan67@gmail.com"
}
resp = requests.post('https://api.moosend.com/v3/subscribers/8b1f6035-1b1f-4edb-aa88-ccc080846a58/subscribe.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&MailingListID=6820a2a4-50c4-48f8-a4e1-629f33303af6&Format=json',
                        json=payload,
                     headers={'Content-Type':'application/json','Accept':'application/json'},)
print (resp.text)
if resp.status_code != 201:
    print('success subscriber')


# to create mailing list
params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json"}
payload = {
  "Name": "New updated List"
}
resp = requests.post('https://api.moosend.com/v3/lists/create.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&Format=json',
                        json=payload,
                     headers={'Content-Type':'application/json','Accept':'application/json'},)
print (resp.text)
if resp.status_code != 201:
    print('createmaillistsuccess')




# to create campaign
params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json"}
payload = {
    "Name": "test4",
    "Subject":"Some subject",
    "SenderEmail":"sales@kodecrux.com",
    "ReplyToEmail":"sales@kodecrux.com",
    "ConfirmationToEmail":"sales@kodecrux.com",
    "WebLocation":"http://13.229.251.62:8000/password-email-verification/?email=arshi.khan67@gmail.com",
    "MailingLists": [
        {
            "MailingListID":"6820a2a4-50c4-48f8-a4e1-629f33303af6"
        }
    ]

}
resp = requests.post('https://api.moosend.com/v3/campaigns/create.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980',
                        json=payload,
                     headers={'Content-Type':'application/json','Accept':'application/json'},)
print ('campaign created',resp.text)
if resp.status_code != 201:
    print('Created task. ID: {}')

# to sending a campaign
params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json","CampaignID":"2772d699-a90d-400c-9bb1-2d0192247585"}
resp = requests.post('https://api.moosend.com/v3/campaigns/2772d699-a90d-400c-9bb1-2d0192247585/send.json?Format=json&apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&CampaignID=5cc6d39f-20ca-4345-bd4b-3af43087db11',
                     headers={'Content-Type':'application/json','Accept':'application/json'},)
print (resp.text)
if resp.status_code != 201:
    print('sendingsuccess')