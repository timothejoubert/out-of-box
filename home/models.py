from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel

from projets.models import ProjetsList
from projets.models import ProjetPage

from equipe.models import ContentUser

class HomePage(Page):
    body = RichTextField(blank=True)
    bodyHeader = RichTextField(blank=True)
    wordsCloud = RichTextField(blank=True)
    # projets = RichTextField(blank=True)
    team = RichTextField(blank=True)
    contact = RichTextField(blank=True)
    footer = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('body', classname="full"),
        FieldPanel('bodyHeader', classname="full"),
        FieldPanel('wordsCloud', classname="full"),
        # FieldPanel('projets', classname="full"),
        FieldPanel('team', classname="full"),
        FieldPanel('contact', classname="full"),
        FieldPanel('footer', classname="full"),
    ]

    def get_context(self, request):
        context = super(HomePage, self).get_context(request)
        context['projets_section'] = ProjetsList.objects.all()
        context['projets_list'] = ProjetPage.objects.all()
        context['equipe_list'] = ContentUser.objects.all()
        return context
