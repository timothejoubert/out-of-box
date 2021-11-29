from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from projets.models import ProjetsList
from projets.models import ProjectItem

from equipe.models import ContentUser
from wordsCloud.models import listWords

from clients.models import clientItem
from footer.models import Footer

class HomePage(Page):
    # template = "home/home_page.html"
    # max_count = 0
    parent_page_types = []

    title_header = RichTextField(null=True, blank=True)
    img_header = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )
    title_wordsCloud = RichTextField(null=True, blank=True)
    title_projets = RichTextField(null=True, blank=True)
    title_team = RichTextField(null=True, blank=True)
    title_contact = RichTextField(null=True, blank=True)
    title_footer = RichTextField(null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('title_header', classname="full"),
        ImageChooserPanel('img_header'),
        FieldPanel('title_projets', classname="full"),
        FieldPanel('title_wordsCloud', classname="full"),
        FieldPanel('title_team', classname="full"),
        FieldPanel('title_contact', classname="full"),
        FieldPanel('title_footer', classname="full"),
    ]

        
    def get_context(self, request):
        context = super(HomePage, self).get_context(request)

        context['projet_model'] = ProjetsList.objects.all()
        context['projets_list'] = ProjectItem.objects.all()

        context['equipe_list'] = ContentUser.objects.all()

        context['word_list'] = listWords.objects.all()

        context['client_list'] = clientItem.objects.all()

        context['footer_list'] = Footer.objects.all()


        return context
