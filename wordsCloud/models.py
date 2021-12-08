from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel, FieldRowPanel
from wagtail.images.edit_handlers import ImageChooserPanel


class wordsCloud(Page):
    parent_page_types = ['home.HomePage']

    content_panels = Page.content_panels + [
        InlinePanel('list_words', ),
    ]

class listWords(Orderable):
    page = ParentalKey(wordsCloud, related_name='list_words')
    mot = models.CharField(max_length=75, null=True, blank=True)

    panels = [
        FieldRowPanel([
            FieldPanel('mot'),
        ])
    ]
