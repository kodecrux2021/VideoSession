from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, status, views

from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from operator import and_
from functools import reduce
# from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.
import requests
import json
import datetime
from customuser.models import CustomUser
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def smtp():
    pass

def Moosend(email):
    params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json"}
    payload = {
        "Name": "New updated List"
    }
    resp = requests.post(
        'https://api.moosend.com/v3/lists/create.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&Format=json',
        json=payload,
        headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
    print (resp.text)
    if resp.status_code != 201:
        success_dict = json.loads(resp.text)
        mail_id = success_dict['Context']
        print('createmaillistsuccess')
        # to create subscriber
        params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json",
                  "MailingListID": mail_id}
        payload = {
            "Email": email
        }
        resp = requests.post(
            'https://api.moosend.com/v3/subscribers/'+ mail_id +'/subscribe.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&MailingListID='+ mail_id +'&Format=json',
            json=payload,
            headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
        print (resp.text)
        if resp.status_code != 201:
            print('success subscriber')
            # to create campaign
            params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json"}
            payload = {
                "Name": "test4",
                "Subject": "Some subject",
                "SenderEmail": "sales@kodecrux.com",
                "ReplyToEmail": "sales@kodecrux.com",
                "ConfirmationToEmail": "sales@kodecrux.com",
                # "WebLocation": "https://en.wikipedia.org/wiki/Wikipedia" ,
                # "WebLocation": "http://13.229.251.62:8000/password-email-verification/" ,
                # "WebLocation": "http://0.0.0.0:81/password-email-verification/",
                "WebLocation": "http://13.229.251.62:8000/password-email-verification/?email="+email,
                "MailingLists": [
                    {
                        "MailingListID": mail_id
                    }
                ]

            }
            resp = requests.post(
                'https://api.moosend.com/v3/campaigns/create.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980',
                json=payload,
                headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
            print ('campaign created', resp.text)
            if resp.status_code != 201:
                success_dict = json.loads(resp.text)
                campaign_id = success_dict['Context']
                print('Created task. ID: {}',campaign_id)
                # to sending a campaign
                params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json",
                          "CampaignID": campaign_id}
                resp = requests.post(
                    'https://api.moosend.com/v3/campaigns/'+ campaign_id +'/send.json?Format=json&apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&CampaignID='+campaign_id+'',
                    headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
                print (resp.text)
                if resp.status_code != 201:
                    print('sendingsuccess')
                    return True
                else:
                    return False

def MoosendTeam(emails):
    params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json"}
    payload = {
        "Name": "New updated List"
    }
    resp = requests.post(
        'https://api.moosend.com/v3/lists/create.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&Format=json',
        json=payload,
        headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
    print (resp.text)
    print ('mailinglist')
    if resp.status_code != 201:
        success_dict = json.loads(resp.text)
        mail_id = success_dict['Context']
        print('createmaillistsuccess')
        # to create subscriber
        params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json",
                  "MailingListID": mail_id}
        for email in emails:
            payload = {
                "Email": email
            }
            resp = requests.post(
                'https://api.moosend.com/v3/subscribers/'+ mail_id +'/subscribe.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&MailingListID='+ mail_id +'&Format=json',
                json=payload,
                headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
            print('email125',email)
            print (resp.text)
        if resp.status_code != 201:
            print ('send_mail1', send_mail)
            sent = send_mail(
                subject='Start Your TeamViewer Meeting',
                message='That’s your message body',
                html_message=render_to_string('teamviewer.html', {'context': 'values'}),
                # plain_message = strip_tags(),
                from_email='sales@kodecrux.com',
                recipient_list=['arshi.khan67@gmail.com'],
                fail_silently=False,
            )
            # send_mail('Subject here', 'Here is the message.', 'sales@kodecrux.com', ['arshi.khan67@gmail.com'],
            #           fail_silently=False)
            print ('sent', sent)
            print('success subscriber')
            # to create campaign
            params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json"}
            payload = {
                "Name": "test4",
                "Subject": "Start Your TeamViewer Meeting",
                "SenderEmail": "sales@kodecrux.com",
                "ReplyToEmail": "sales@kodecrux.com",
                "ConfirmationToEmail": "sales@kodecrux.com",
                # "WebLocation": "https://127daaa57c8b.ngrok.io/teamtemplate/",
                # "WebLocation": "http://13.229.251.62:8000/password-email-verification/" ,
                # "WebLocation": "http://0.0.0.0:81/password-email-verification/",
                # "WebLocation": "http://0.0.0.0:81/teamtemplate/?email="+emails,
                "WebLocation": "http://13.229.251.62:8000/teamtemplate/?email="+email,

                "MailingLists": [
                    {
                        "MailingListID": mail_id
                    }
                ]


            }
            resp = requests.post(
                'https://api.moosend.com/v3/campaigns/create.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980',
                json=payload,
                headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
            print ('campaign created', resp.text)
            if resp.status_code != 201:
                success_dict = json.loads(resp.text)
                campaign_id = success_dict['Context']
                print('Created task. ID: {}',campaign_id)
                # to sending a campaign
                params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json",
                          "CampaignID": campaign_id}
                resp = requests.post(
                    'https://api.moosend.com/v3/campaigns/'+ campaign_id +'/send.json?Format=json&apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&CampaignID='+campaign_id+'',
                    headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
                print (resp.text)
                if resp.status_code != 201:
                    print('sendingsuccess')
                    return True
                else:
                    return False

class MessageViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['sent_by','read_by','conversation']



# class ConversationViewset(viewsets.ModelViewSet):
#     queryset = models.Conversation.objects.all()
#     permission_classes = [permissions.AllowAny]
#     serializer_class = serializers.ConversationSerializer
#     filter_backends = [DjangoFilterBackend]
#     filter_fields = ['includes','archived_by']

class ConversationViewset(viewsets.ModelViewSet):
    queryset = models.Conversation.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.ConversationSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['includes', 'archived_by']

    # def get_queryset(self):
    #     queryset = models.Conversation.objects.all()
    #     includes = eval(self.request.query_params.get('includes'))
    #     # for include in includes:
    #     #     queryset = queryset.filter(includes__in=include)
    #     queryset = queryset.filter(reduce(and_, [Q(includes__in=c) for c in includes]))
    #     return queryset


class ConversationView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        snippets = models.Conversation.objects.filter(includes=request.user)
        serializer = serializers.ConversationSerializer(snippets, many=True)
        return Response(serializer.data)

    """
    create a new snippet.
    """
    def post(self, request, format=None):
        serializer = serializers.ConversationSerializer(data=request.data)
        # serializer= serializer.data.includes.add(request.user.id)
        print('request.data',request.data)
        if serializer.is_valid():
            serializer.save()
            print('serializer.data',serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeamviewerView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        smtp()
        parameters = {
            "response_type": 'code',
            "client_id": '388609-YgM2aKpYNsYmThQrs7Cn',
            "redirect_uri": 'https://community.teamviewer.com/English/discussion/53405/authorization-code',
        }
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.4324.96  Safari/537.36'}

        resp = requests.get(
            'https://login.teamviewer.com/oauth2/authorize?response_type=code&client_id=388609-YgM2aKpYNsYmThQrs7Cn&redirect_uri=https://community.teamviewer.com/English/discussion/53405/authorization-code/',
            headers=headers, params=parameters, allow_redirects=True)
        print (resp.text)
        print ('resp.url', resp.url)
        if resp.status_code != 201:
            print('sendingsuccess')
            return Response(resp.url)
class TeamviewerAccesstokenView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        code = self.request.query_params.get('code', None)
        # code = raw_input('Enter your AUTH code:')
        print ('code', code)
        print ('hi')
        data = {
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': '388609-YgM2aKpYNsYmThQrs7Cn',
            'client_secret': '9o4on6EWu0gY5CUzXwpd',
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        resp = requests.post(
            'https://webapi.teamviewer.com/api/v1/oauth2/token/',
            headers=headers, data=data, allow_redirects=True)
        print (resp.text)
        if resp.status_code != 201:
            print('sendingsuccess')
            data = json.loads(resp.text)
            print ('data',data.get('access_token'),type(data))
            print ('data',data.get('refresh_token'),type(data))
            models.TeamViewerTokens.objects.filter()
            teamviewer_data = models.TeamViewerTokens.objects.create(access_token=data.get('access_token'),refresh_token=data.get('refresh_token'),expire_on=datetime.datetime.today() + datetime.timedelta(days=1))
            return Response(resp.text)

def refresh_token():
        refresh_token = models.TeamViewerTokens.objects.exclude(access_token=None).exclude(refresh_token=None).last()
        # code = raw_input('Enter your AUTH code:')
        print ('hi refresh token')
        print ('refresh_token', refresh_token.refresh_token)
        print ('hi')
        data = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token.refresh_token,
            'client_id': '388609-YgM2aKpYNsYmThQrs7Cn',
            'client_secret': '9o4on6EWu0gY5CUzXwpd',
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        resp = requests.post(
            'https://webapi.teamviewer.com/api/v1/oauth2/token/',
            headers=headers, data=data, allow_redirects=True)
        print (resp.text)
        if resp.status_code != 201:
            print('sendingsuccessrefresh')
            data = json.loads(resp.text)
            print ('data', data.get('access_token'), type(data))
            print ('data', data.get('refresh_token'), type(data))
            teamviewer_data = models.TeamViewerTokens.objects.create(access_token=data.get('access_token'),refresh_token=data.get('refresh_token'),expire_on=datetime.datetime.today() + datetime.timedelta(days=1))
            return teamviewer_data

class TeamviewerMeetingtokenView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        access_token = models.TeamViewerTokens.objects.exclude(access_token=None).exclude(refresh_token=None).last()
        conversation_id = self.request.query_params.get('conversation_id', None)
        # code = raw_input('Enter your AUTH code:')
        print ('access_token154', access_token.access_token)
        print ('hiTeamviewerMeetingtokenView')
        data = {
            'type': 'None',
            'subject': 'subject',
            'start': '2021-11-25T14:00:00Z',
            'end': '2021-11-25T15:00:00Z',
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer {}'.format(access_token.access_token)
        }
        resp = requests.post(
            'https://webapi.teamviewer.com//api/v1/meetings/',
            headers=headers, data=data, allow_redirects=True)
        print ('line170',resp.text)
        if '"error":"invalid_token"' in resp.text:
            access_token = refresh_token()
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer {}'.format(access_token.access_token)
            }
            resp = requests.post(
                'https://webapi.teamviewer.com//api/v1/meetings/',
                headers=headers, data=data, allow_redirects=True)
        if resp.status_code != 201:
            print('sendingsuccess')
            data = json.loads(resp.text)
            print ('data',data.get('participant_web_link'),type(data))
            print ('data',data.get('refresh_token'),type(data))
            print('qaqaaccess_token',access_token)
            r = requests.get('http://13.229.251.62:8000/teamtemplate/')
            print ('r',r)
            emails=['sales@kodecrux.com','shraddha456khandelwal@gmail.com','pawasiet@gmail.com']
            conversation = models.Conversation.objects.filter(id=conversation_id)
            if conversation.exists():
                conversation= conversation.first()
                for i in conversation.includes.all():
                    emails.append(i.email)
                    print('i',i.email)
            MoosendTeam(emails)
            teamviewer_meeting_data = models.Conversation.objects.create(participant_web_link=data.get('participant_web_link'),refresh_token=access_token.refresh_token,access_token=access_token.access_token
                                    ,subject=data.get('subject'),conference_call_information=data.get('conference_call_information'),password=data.get('password'),teamviewr_id=data.get('id'))
            return Response(resp.text)


class TeamViewerTemplateViewSet(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self,request):
        email = self.request.query_params.get('email', None)
        print('email', email)
        meeting_id = models.Conversation.objects.exclude(access_token=None).exclude(refresh_token=None).last()
        print ('meeting_id267',meeting_id.teamviewr_id)
        # if meeting_id.exists():
        #     is_user = meeting_id.first()
        #     print ('is_user.verification_code',is_user.verification_code)
        #     verification_code = is_user.verification_code
        #     # success = Moosend(email)
        #     # ForgotPasswordVerification(code, is_user.email)
        #     # content = {'code':code}
        # print ('code',verification_code)
        context = {'meeting_id':meeting_id.teamviewr_id}
        return render(self.request, 'teamviewer.html', context)

# class TeamViewerMoosendViewSet(generics.ListAPIView):
#     serializer_class = serializers.ForgotPasswordEmailVerificationSerializers
#     permission_classes = [permissions.AllowAny]
#
#     def get_queryset(self):
#         email = self.request.query_params.get('email', None)
#         print('email', email)
#         user = models.CustomUser.objects.filter(email=str(email))
#         if user.exists():
#             is_user = user.first()
#             code = random.randint(100000, 999999)
#             print('instance', is_user.verification_code, code)
#             is_user.verification_code = code
#             is_user.save()
#             success = Moosend(email)
#             r = requests.get('http://fede2f2928d5.ngrok.io/password-email-verification/?email='+email+'&code='+str(code))
#             print ('r',r)
#             # ForgotPasswordVerification(code, is_user.email)
#         return user

