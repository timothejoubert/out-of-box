from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel


class ProjetsList(Page):
    parent_page_types = ['home.HomePage']
    max_count = 1

    projetTxt = RichTextField(max_length=100, null=True, blank=True)

    content_panels = Page.content_panels + [        
        FieldPanel('projetTxt', classname="full"),
    ]
