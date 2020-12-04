from user.views import CustomUserViewset
from rest_framework import routers




router = routers.DefaultRouter()
router.register('user',CustomUserViewset),








