# Generated by Django 3.1.14 on 2022-02-11 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projetPage', '0004_remove_projetpage_projet_description_complete'),
    ]

    operations = [
        migrations.AddField(
            model_name='projetpage',
            name='projet_type',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
