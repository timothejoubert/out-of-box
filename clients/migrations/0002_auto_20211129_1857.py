# Generated by Django 3.1.8 on 2021-11-29 17:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0023_add_choose_permissions'),
        ('clients', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='listWords',
            new_name='clientItem',
        ),
    ]
