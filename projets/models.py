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
        MultiFieldPanel(
            [
                FieldPanel('projetTxt', classname="full")
            ],
            heading="Informations principale des projets",
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
				InlinePanel("project_item", classname="full"),
            ],
            heading="Listes des projets",
            classname="collapsible"
        ),
    ]

class ProjectItem(Orderable):
    page = ParentalKey("ProjetsList", related_name="project_item")

    projet_nom = models.CharField(max_length=100, null=True, blank=True)
    projet_description = RichTextField(
        features=['bold', 'italic', 'link'], null=True, blank=True)
    projet_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )
    projet_link = models.CharField(max_length=100, null=True, blank=True)

    panels = [
        FieldPanel('projet_nom', classname="title"),
        FieldPanel('projet_description', classname="full"),
        ImageChooserPanel("projet_image"),
        FieldPanel('projet_link', classname="full"),
    ]
