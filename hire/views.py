from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.http import HttpResponse
import razorpay
from rest_framework import permissions

client = razorpay.Client(auth=("rzp_test_LmOgpIykhftvK7",
    "rqWbFlWkSw3OaIeLZqEGgPFg"))

client.set_app_details(
    {"title" : "CodeCrux",
    "version" : "3.1.3"})

class HireViewset(viewsets.ModelViewSet):
    queryset = models.Hire.objects.all()
    serializer_class = serializers.HireSerializer
    def retrieve(self, request, pk=None):
        queryset = self.queryset
        contract = get_object_or_404(queryset, pk=pk)
        serializer = serializers.HireSerializer(contract)
        return Response(serializer.data)
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ('user__technology', 'user__sub_technology', 'user__topic')

class Order(APIView):
	permission_classes = [permissions.AllowAny]
	def get(self, request):
		hire = models.Hire.objects.get(id=request.GET["hire_id"])
		order_amount = hire.budget*100 if hire.budget else 100
		order_currency = 'INR'
		order_receipt = str(hire.id)
		# notes = {'Shipping address': 'Bommanahalli, Bangalore'}   # OPTIONAL
		# reponse = client.order.create(amount=order_amount, currency=order_currency, receipt=order_receipt, )
		print("sfs",dict(amount=order_amount, currency='INR', receipt=order_receipt,
			payment_capture='1'))
		response = client.order.create(dict(amount=order_amount, currency='INR', receipt=order_receipt,
			payment_capture='1'))
		print("self, ",response)
		return HttpResponse(response["id"])







































# import razorpay
# from rest_framework import permissions
# client = razorpay.Client(auth=("rzp_test_LmOgpIykhftvK7",
#     "rqWbFlWkSw3OaIeLZqEGgPFg"))
#
# client.set_app_details(
#     {"title" : "CodeCrux",
#     "version" : "3.1.3"})
# from django.shortcuts import render
#
# # Create your views here.
# from django.shortcuts import render
# from rest_framework import viewsets
# from . import serializers
# from . import models
# from rest_framework.response import Response
# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework.views import APIView
# from django.http import HttpResponse
#
# class HireViewset(viewsets.ModelViewSet):
#     queryset = models.Hire.objects.all()
#     serializer_class = serializers.HireSerializer
#     # filter_backends = [DjangoFilterBackend]
#     # filterset_fields = ('user__technology', 'user__sub_technology', 'user__topic')
#
# class Order(APIView):
# 	permission_classes = [permissions.AllowAny]
# 	def get(self, request):
# 		hire = models.Hire.objects.get(id=1)
# 		order_amount = 1000
# 		order_currency = 'INR'
# 		order_receipt = str(hire.id)
# 		# notes = {'Shipping address': 'Bommanahalli, Bangalore'}   # OPTIONAL
# 		# reponse = client.order.create(amount=order_amount, currency=order_currency, receipt=order_receipt, )
# 		print("sfs",dict(amount=order_amount, currency='INR', receipt=order_receipt,
# 			payment_capture='1'))
# 		response = client.order.create(dict(amount=order_amount, currency='INR', receipt=order_receipt,
# 			payment_capture='1'))
# 		print("self, ",response)
# 		return HttpResponse(response)
#
