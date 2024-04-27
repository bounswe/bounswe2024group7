from django.db import models
from django.contrib.auth.models import User
import json

class Image(models.Model):
    url = models.CharField(primary_key=True, max_length=255)

class Profile(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username')
    bio = models.TextField(null=True, blank=True)
    profile_picture = models.ForeignKey(Image, on_delete=models.DO_NOTHING, to_field="url")
    list_of_post_ids = models.TextField(default=json.dumps([]))
    list_of_follower_usernames = models.TextField(default=json.dumps([]))
    list_of_following_usernames = models.TextField(default=json.dumps([]))
    list_of_blocked_user_usernames = models.TextField(default=json.dumps([]))
    
    def str(self):
        return self.username

    
class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    title = models.TextField(max_length=50)
    is_wikidata_api = models.BooleanField(default=False)
    textual_content = models.TextField(max_length=600, blank=True)
    picture = models.ForeignKey(Image, on_delete= models.CASCADE, to_field="url")
    number_of_likes = models.IntegerField()
    username = models.ForeignKey(User, on_delete= models.CASCADE, to_field="username")
    list_of_label_ids = models.TextField(default = json.dumps([]))

    def str(self):
        return self.title
    
class Collection(models.Model):
    collection_id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=30, blank = False)
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")
    list_of_post_ids = models.TextField(default= json.dumps([]))

    def str(self):
        return self.collection_id

class Like(models.Model):
    id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, to_field="post_id")
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")

    def str(self):
        return self.like_id

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, to_field="post_id")
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")

    def str(self):
        return self.comment_id
    
class Label(models.Model):
    label_id = models.AutoField(primary_key=True)
    label_name = models.TextField()
    label_type = models.TextField()
    material = models.TextField()
    genre = models.TextField()
    is_own_artwork = models.BooleanField(default=False)
   
    def str(self):
        return self.label_id

class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    title = models.TextField(max_length=50)
    content = models.TextField(blank = True, max_length=200)
    list_of_usernames = models.TextField(default= json.dumps([]))

    def str(self):
        return self.notification_id
