from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel


class ProjetsList(Page):
    parent_page_types = ['home.HomePage']
    subpage_types = ['projetPage.ProjetPage']
    max_count = 1

    projetTxt = RichTextField(max_length=100, null=True, blank=True)

    content_panels = Page.content_panels + [        
        FieldPanel('projetTxt', classname="full"),
    ]

    # def get_context(self, request):
    #     context = super(ProjetsList, self).get_context(request)

    #     context['projet_pages'] = ProjetPage.objects.all()
    #     print(ProjetPage.objects.all())

    #     return context