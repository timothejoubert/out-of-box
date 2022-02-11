from django.db import models

from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from wagtailmedia.edit_handlers import MediaChooserPanel

from projetPage.models import ProjetPage
from equipe.models import ContentUser
from wordsCloud.models import listWords, wordsCloud
from clients.models import clientItem
from footer.models import Footer

from django.conf import settings


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

    title_tagline = models.CharField(max_length=40, null=True, blank=True)
    line_1_tagline = models.CharField(max_length=80, null=True, blank=True)
    line_2_tagline = models.CharField(max_length=80, null=True, blank=True)

    content_panels = [
        MultiFieldPanel(
            [
                FieldPanel('title_tagline', classname="full"),
                FieldPanel('line_1_tagline', classname="full"),
                FieldPanel('line_2_tagline', classname="full"),
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
        context['word_list'] = wordsCloud.objects.all()
        context['client_list'] = clientItem.objects.all()
        context['footer_list'] = Footer.objects.all()
        context['debug'] = settings.DEBUG

        return context
