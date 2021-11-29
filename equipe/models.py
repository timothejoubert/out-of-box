from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel


class Equipe(Page):
    parent_page_types = ['home.HomePage']

    description_principale = RichTextField(
        features=['bold', 'italic', 'link'], null=True, blank=True
	)
    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel('description_principale', classname="full"),
            ],
            heading="Informations principale",
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
				InlinePanel("content_user"),
            ],
            heading="Galerie de projet",
            classname="collapsible"
        ),
    ]

class ContentUser(Orderable):
    page = ParentalKey("Equipe", related_name="content_user")

    nom_user = models.CharField(max_length=100, null=True, blank=True)
    description_user = RichTextField(
        features=['bold', 'italic', 'link'], null=True, blank=True)
    # annee_conf = models.CharField(max_length=200, null=True, blank=True)
    image_user = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )
	
    external_link = models.URLField(null=True, blank=True)
	# external_link_slug = models.CharField(max_length=100, null=True, blank=True)

    panels = [
        FieldPanel('nom_user', classname="title"),
        FieldPanel('description_user', classname="full"),
        ImageChooserPanel("image_user"),
        FieldPanel('external_link', classname="full"),
        # FieldPanel('external_link_slug', classname="full"),
    ]
