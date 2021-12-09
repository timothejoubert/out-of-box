from django.db import models

from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.models import Page, Orderable
from wagtail.admin.edit_handlers import InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel

class Footer(Page):
        parent_page_types = ['home.HomePage']
        max_count = 1

        logo_contact = models.ForeignKey(
                "wagtailimages.Image",
                null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
        )
        info_contact = RichTextField(
                features=['bold', 'italic', 'link'], null=True, blank=True
        )
        content_panels = Page.content_panels + [
                ImageChooserPanel('logo_contact'),
                FieldPanel('info_contact'),
        ]