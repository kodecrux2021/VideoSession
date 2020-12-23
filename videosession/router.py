from user.views import EducatorViewset,ClientViewset
from customuser.views import CustomUserViewset
from technology.views import TechnologyViewset,SubtechnologyViewset,TopicViewset
from session.views import SessionViewset
from rest_framework import routers
from hire.views import HireViewset
from message.views import MessageViewset,ConversationViewset



router = routers.DefaultRouter()
router.register('customuser',CustomUserViewset),
router.register('educator',EducatorViewset),
router.register('client',ClientViewset),
router.register('technology',TechnologyViewset),
router.register('subtechnology',SubtechnologyViewset),
router.register('topic',TopicViewset),
router.register('session',SessionViewset),
router.register('hire',HireViewset),
router.register('message',MessageViewset),
router.register('conversation',ConversationViewset),













