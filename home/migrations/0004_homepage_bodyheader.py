# Generated by Django 3.1.8 on 2021-11-29 10:58

from django.db import migrations
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_homepage_body'),
    ]

    operations = [
        migrations.AddField(
            model_name='homepage',
            name='bodyHeader',
            field=wagtail.core.fields.RichTextField(blank=True),
        ),
    ]
