from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.admin.edit_handlers import InlinePanel, FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel


class clientsList(Page):
    parent_page_types = ['home.HomePage']
    max_count = 1

    content_panels = [
        InlinePanel('client_item'),
    ]

class clientItem(Orderable):
    page = ParentalKey(clientsList, related_name='client_item')
    
    nom_entreprise = models.CharField(max_length=100, null=True, blank=True, verbose_name="Entreprise")
    image_client = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )

    panels = [
        FieldPanel('nom_entreprise'),
        ImageChooserPanel("image_client"),
    ]
