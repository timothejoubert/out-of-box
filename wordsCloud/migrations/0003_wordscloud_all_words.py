# Generated by Django 3.1.8 on 2022-01-04 19:42

from django.db import migrations
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wordsCloud', '0002_listwords'),
    ]

    operations = [
        migrations.AddField(
            model_name='wordscloud',
            name='all_words',
            field=wagtail.core.fields.RichTextField(blank=True, null=True),
        ),
    ]
