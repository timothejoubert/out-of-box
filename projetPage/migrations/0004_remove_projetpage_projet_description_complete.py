# Generated by Django 3.1.8 on 2022-01-27 16:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projetPage', '0003_allimg'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projetpage',
            name='projet_description_complete',
        ),
    ]
