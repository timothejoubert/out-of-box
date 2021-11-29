# Generated by Django 3.1.8 on 2021-11-29 12:49

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.blocks
import wagtail.core.fields
import wagtail.images.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0060_fix_workflow_unique_constraint'),
        ('wagtailimages', '0023_add_choose_permissions'),
        ('home', '0007_auto_20211129_1326'),
    ]

    operations = [
        migrations.CreateModel(
            name='Equipe',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
                ('nom_projet', models.CharField(blank=True, max_length=100, null=True)),
                ('annee_projet', models.CharField(blank=True, max_length=100, null=True)),
                ('description_projet', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('content', wagtail.core.fields.StreamField([('image', wagtail.core.blocks.StructBlock([('image', wagtail.images.blocks.ImageChooserBlock(label='Image'))]))], blank=True, null=True)),
                ('thumbnail_projet', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
    ]
