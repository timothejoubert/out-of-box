from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel


class Equipe(Page):
    parent_page_types = ['home.HomePage']
    max_count = 1

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
				InlinePanel("content_user", label="un équipier"),
            ],
            heading="Les différents profiles",
            classname="collapsible"
        ),
    ]

class ContentUser(Orderable):
    page = ParentalKey("Equipe", related_name="content_user")

    nom_user = models.CharField(max_length=100, null=True, blank=True, verbose_name="Nom")
    role_user = models.CharField(max_length=100, null=True, blank=True , verbose_name="Job")
    # annee_conf = models.CharField(max_length=200, null=True, blank=True)
    image_user = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True, on_delete=models.SET_NULL, related_name="+", verbose_name="Photo"
    )
	
    external_link = models.URLField(null=True, blank=True, verbose_name="Lien réseau")
	# external_link_slug = models.CharField(max_length=100, null=True, blank=True)

    panels = [
        FieldPanel('nom_user', classname="col6"),
        FieldPanel('role_user', classname="col6"),
        ImageChooserPanel("image_user"),
        FieldPanel('external_link', classname="full"),
        # FieldPanel('external_link_slug', classname="full"),
    ]

    # class Meta:
    #         icon = 'user'
