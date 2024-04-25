from django.db import models
from django.contrib.auth.models import User
import json


class Profile(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username')
    bio = models.TextField(null=True, blank=True)
    create_date = models.DateField()
    profile_picture = models.TextField(null=True, blank=True)
    list_of_post_ids = models.TextField(default=json.dumps([]))
    list_of_follower_usernames = models.TextField(default=json.dumps([]))
    list_of_following_usernames = models.TextField(default=json.dumps([]))
    list_of_blocked_user_usernames = models.TextField(default=json.dumps([]))
    list_of_collection_ids = models.TextField(default=json.dumps([]))

    def str(self):
        return self.username
