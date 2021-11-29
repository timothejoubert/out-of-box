from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.admin.edit_handlers import InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel


class clientsList(Page):
    parent_page_types = ['home.HomePage']

    content_panels = Page.content_panels + [
        InlinePanel('client_item'),
    ]

class clientItem(Orderable):
    page = ParentalKey(clientsList, related_name='client_item')

    image_client = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )

    panels = [
        ImageChooserPanel("image_client"),
    ]
