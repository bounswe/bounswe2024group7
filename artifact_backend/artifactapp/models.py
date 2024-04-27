from django.db import models
from django.contrib.auth.models import User
import json

class Image(models.Model):
    url = models.TextField(primary_key=True)

class Profile(models.Model):
    profile_id = models.AutoField(primary_key= True)
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username')
    bio = models.TextField(null=True, blank=True)
    create_date = models.ForeignKey(User, on_delete=models.CASCADE, to_field='create_date')
    profile_picture = models.ForeignKey(Image, on_delete= models.DO_NOTHING, to_field="url")
    list_of_post_ids = models.TextField(default=json.dumps([]))
    list_of_follower_usernames = models.TextField(default=json.dumps([]))
    list_of_following_usernames = models.TextField(default=json.dumps([]))
    list_of_blocked_user_usernames = models.TextField(default=json.dumps([]))
    list_of_collection_ids = models.TextField(default=json.dumps([]))

    def str(self):
        return self.username

class User(models.Model):
    username = models.TextField(max_length = 20, primary_key=True, default="anonymus_user")
    password = models.TextField(max_length=20, null=True, unique=True)
    e_mail = models.TextField(null=True, unique=True)
    create_date = models.DateField(auto_now_add=True)
    last_login = models.DateTimeField(null=True)
    profile_picture = models.ForeignKey(Image, on_delete= models.DO_NOTHING, to_field="url")
    is_registered = models.BooleanField(default = False)
    is_suspended = models.BooleanField(default = False)
    is_administrator = models.BooleanField(default=False)


    def str(self):
        return self.username
    
class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    title = models.TextField(max_length=50)
    textual_conetent = models.TextField(max_length=600, blank=True)
    profile_picture = models.ForeignKey(Image, on_delete= models.CASCADE, to_field="url")
    username_comment_list = models.TextField(default=json.dumps([]))
    number_of_likes = models.IntegerField()
    profile_id = models.ForeignKey(Profile, on_delete= models.CASCADE, to_field="profile_id")
    list_of_label_ids = models.TextField(default = json.dumps([]))


    def str(self):
        return self.post_id
    
class Collection(models.Model):
    collection_id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=30, blank = False)
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")
    list_of_post_ids = models. TextField(default= json.dumps([]))

    def str(self):
        return self.collection_id

class Like(models.Model):
    like_id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, to_field="post_id")
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")

    def str(self):
        return self.like_id

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, to_field="post_id")
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")

    def str(self):
        return self.comment_id
    
class Label(models.Model):
    label_id = models.AutoField(primary_key=True)
    label_name = models.TextField(blank=False)
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
    list_of_usernames = models. TextField(default= json.dumps([]))

    def str(self):
        return self.notification_id

class WikidataResult(models.Model):
    title = models.TextField(max_length=100,primary_key=True)
    content = models.TextField(max_length=1000)
    image = models.ForeignKey(Image, on_delete=models.DO_NOTHING, to_field="url")
    list_of_label_ids = models.TextField(default= json.dumps([]))

    def str(self):
        return self.title
