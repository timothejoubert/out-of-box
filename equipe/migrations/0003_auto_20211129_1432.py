# Generated by Django 3.1.8 on 2021-11-29 13:32

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields
import wagtail.images.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('equipe', '0002_auto_20211129_1409'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipe',
            name='nom_user',
            field=wagtail.core.fields.RichTextField(blank=True),
        ),
        migrations.AlterField(
            model_name='equipe',
            name='team_user',
            field=wagtail.core.fields.StreamField([('image', wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock(label='Photo'))]))], blank=True, null=True),
        ),
    ]
