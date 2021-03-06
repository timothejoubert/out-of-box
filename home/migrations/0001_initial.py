# Generated by Django 3.1.8 on 2022-01-03 18:39

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('wagtailimages', '0023_add_choose_permissions'),
        ('wagtailmedia', '0004_duration_optional_floatfield'),
        ('wagtailcore', '0060_fix_workflow_unique_constraint'),
    ]

    operations = [
        migrations.CreateModel(
            name='HomePage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
                ('title_header', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('title_wordsCloud', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('title_projets', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('title_team', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('title_footer', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('img_header', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image')),
                ('video_header', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailmedia.media')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
    ]
