from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

class ProjetPage(Page):
    parent_page_types = ['projets.ProjetsList']

    projet_nom = models.CharField(max_length=100, null=True, blank=True)
    projet_description = RichTextField(
        features=['bold', 'italic', 'link'], null=True, blank=True)
    projet_description_complete = RichTextField(
        features=['bold', 'italic', 'link'], null=True, blank=True)
    projet_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )
    projet_link = models.CharField(max_length=100, null=True, blank=True)

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
            FieldPanel('projet_nom'),
            FieldPanel('projet_description'),
            FieldPanel('projet_description_complete'),
            ImageChooserPanel("projet_image"),
            FieldPanel('projet_link'),
            ],
            heading="Informations du projet",
            classname="collapsible"
        )
    ]

    class Meta:
        verbose_name = "template de page projet"


