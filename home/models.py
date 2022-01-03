from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from wagtailmedia.edit_handlers import MediaChooserPanel

from projetPage.models import ProjetPage
from equipe.models import ContentUser
from wordsCloud.models import listWords
from clients.models import clientItem
from footer.models import Footer


class videoHeader(Orderable):
    page = ParentalKey("HomePage", related_name="videos_header")

    video_header = models.ForeignKey(
        'wagtailmedia.Media',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        MediaChooserPanel('video_header'),
    ]

class HomePage(Page):
    # template = "home/home_page.html"
    max_count = 1
    parent_page_types = []

    title_header = RichTextField(null=True, blank=True)

    content_panels = [
        MultiFieldPanel(
            [
                FieldPanel('title_header', classname="full"),
            ],
            heading="Informations principale",
            classname="collapsible collapsed"
        ),
        MultiFieldPanel(
            [
				InlinePanel("videos_header", label="nouvelle vidéo de header"),
            ],
            heading="Ajouter vidéo de header",
            classname="collapsible"
        ),
    ]


        
    def get_context(self, request):
        context = super(HomePage, self).get_context(request)

        context['projet_pages'] = ProjetPage.objects.all()
        context['equipe_list'] = ContentUser.objects.all()
        context['word_list'] = listWords.objects.all()
        context['client_list'] = clientItem.objects.all()
        context['footer_list'] = Footer.objects.all()

        
        return context
