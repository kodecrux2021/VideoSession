from hire.models import Hire
from datetime import date, timedelta
import datetime
from .models import Report
from django.db.models import Sum,F

def update_something():
    hire_All = Hire.objects.all()
    print("this function runs every day",hire_All)
    date = datetime.date.today()
    start_week = date - datetime.timedelta(date.weekday()+7)
    print ('start_week',start_week)
    end_week = date - datetime.timedelta(7)
    if not Report.objects.filter(date=end_week, hires=None).exists():
        print('end_week',end_week)
        # current_week = date.today().isocalendar()[3]
        hire = Hire.objects.filter(date__lte=end_week)
        revenue = hire.aggregate(
        total_price=Sum(F('budget') / 5))['total_price']
        report = Report.objects.create(payment_collected=revenue,date=end_week)
        for hiree in hire:
            hiree.report = report
            hiree.save()
        print ('report',report)
        print ('revenue',revenue)
        print("this function runs every 7th day",hire)
