from django.db import models
from django.contrib.auth.models import User


class Image(models.Model):
    url = models.CharField(primary_key=True, max_length=255)


class Profile(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE, to_field='username', db_column='username')
    bio = models.TextField(null=True, blank=True)
    profile_picture = models.ForeignKey(Image, null=True, blank=True, on_delete=models.DO_NOTHING, to_field="url",
                                        db_column="profile_picture_url")
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def str(self):
        return self.username


class Post(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, editable=False)
    title = models.TextField(max_length=50)
    content = models.TextField(max_length=600)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, to_field="url")  # TODO: Is multiple image allowed?
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def str(self):
        return self.title


class Collection(models.Model):
    name = models.TextField(max_length=30)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    posts = models.ManyToManyField(Post, related_name='collection_post')
    created_at = models.DateTimeField(auto_now_add=True)

    def str(self):
        return self.name


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Like by {self.profile.username} on post {self.post.id}"


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Comment by {self.profile.username} on post {self.post.id}"


class Label(models.Model):
    name = models.TextField()
    type = models.TextField()
    material = models.TextField()
    genre = models.TextField()
    is_own_artwork = models.BooleanField(default=False)

    def str(self):
        return f"Label {self.name} of type {self.type}"


class Notification(models.Model):
    title = models.TextField(max_length=50)
    content = models.TextField(blank=True, max_length=200)
    receivers = models.ManyToManyField(User, related_name='notifications')
    created_at = models.DateTimeField(auto_now_add=True)

    def str(self):
        return self.title
