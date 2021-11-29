# Generated by Django 3.1.8 on 2021-11-29 11:37

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailredirects', '0006_redirect_increase_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wagtailcore', '0060_fix_workflow_unique_constraint'),
        ('wagtailforms', '0004_add_verbose_name_plural'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('projets', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Projets',
            new_name='ProjetsList',
        ),
    ]
