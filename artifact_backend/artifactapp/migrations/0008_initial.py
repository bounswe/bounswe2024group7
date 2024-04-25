# Generated by Django 5.0.4 on 2024-04-25 17:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('artifactapp', '0007_delete_profile'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField(blank=True, null=True)),
                ('create_date', models.DateField()),
                ('profile_picture', models.TextField(blank=True, null=True)),
                ('list_of_post_ids', models.TextField(default='[]')),
                ('list_of_follower_usernames', models.TextField(default='[]')),
                ('list_of_following_usernames', models.TextField(default='[]')),
                ('list_of_blocked_user_usernames', models.TextField(default='[]')),
                ('list_of_collection_ids', models.TextField(default='[]')),
                ('username', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
