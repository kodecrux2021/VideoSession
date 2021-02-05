import requests
from django.core.mail import send_mail

send_mail('Subject here', 'Here is the message.', 'sales@kodecrux.com', ['arshi.khan67@gmail.com'],
          fail_silently=False)
print ('send_mail', send_mail)

# to create subscriber
params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json","MailingListID":"b3227489-b08b-43b0-8fd9-7525e7aba38d"}
payload = {
  "Email": "arshi.khan67@gmail.com"
}
resp = requests.post('https://api.moosend.com/v3/subscribers/b3227489-b08b-43b0-8fd9-7525e7aba38d/subscribe.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&MailingListID=6820a2a4-50c4-48f8-a4e1-629f33303af6&Format=json',
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
# params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json"}
# payload = {
#     "Name": "test5",
#     "Subject":"Some subject",
#     "SenderEmail":"sales@kodecrux.com",
#     "ReplyToEmail":"sales@kodecrux.com",
#     "ConfirmationToEmail":"sales@kodecrux.com",
#     "WebLocation":"https://en.wikipedia.org/wiki/Wikipedia",
#     "MailingLists": [
#         {
#             "MailingListID":" bc91ad37-ba9c-4fc7-a8bc-1b06317e35d9"
#         }
#     ]
#
# }
# resp = requests.post('https://api.moosend.com/v3/campaigns/create.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980',
#                         json=payload,
#                      headers={'Content-Type':'application/json','Accept':'application/json'},)
# print ('campaign created',resp.text)
# if resp.status_code != 201:
#     print('Created task. ID: {}')
#
# # to sending a campaign
# params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json","CampaignID":"046854ac-bb71-4172-85fb-7b1cac1a947c"}
# resp = requests.post('https://api.moosend.com/v3/campaigns/046854ac-bb71-4172-85fb-7b1cac1a947c/send.json?Format=json&apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&CampaignID=046854ac-bb71-4172-85fb-7b1cac1a947c',
#                      headers={'Content-Type':'application/json','Accept':'application/json'},)
# print (resp.text)
# if resp.status_code != 201:
#     print('sendingsuccess')