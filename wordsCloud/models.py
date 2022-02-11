from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel, FieldRowPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from django import forms
from wagtail.admin import widgets


class wordsCloud(Page):
    parent_page_types = ['home.HomePage']
    max_count = 1

    all_words = RichTextField(null=True, blank=True, features=[])
    speed = models.DecimalField(max_digits=5, decimal_places=1, default=2.5)

    content_panels = Page.content_panels + [
        FieldPanel('all_words', classname="full"),
        FieldPanel('speed', widget=forms.NumberInput(
            attrs={'placeholder': 'Vitesse de défilement'})),
        InlinePanel('list_words'),
    ]

    def word_count(self):
        count = len(self.all_words.split())
        for block in self.all_words:
            count += len(str(block.value).split())

        return count


class listWords(Orderable):
    page = ParentalKey(wordsCloud, related_name='list_words')
    mot = models.CharField(max_length=75, null=True, blank=True)

    panels = [
        FieldRowPanel([
            FieldPanel('mot'),
        ])
    ]
