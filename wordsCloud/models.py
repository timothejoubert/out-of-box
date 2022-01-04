from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel, FieldRowPanel
from wagtail.images.edit_handlers import ImageChooserPanel


class wordsCloud(Page):
    parent_page_types = ['home.HomePage']
    max_count = 1

    all_words = RichTextField(null=True, blank=True)

    content_panels = [
        FieldPanel('all_words', classname="full"),
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
