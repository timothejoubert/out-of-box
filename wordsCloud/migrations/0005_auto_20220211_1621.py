# Generated by Django 3.1.14 on 2022-02-11 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordsCloud', '0004_wordscloud_speed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wordscloud',
            name='speed',
            field=models.DecimalField(decimal_places=1, default=2.5, max_digits=5),
        ),
    ]
