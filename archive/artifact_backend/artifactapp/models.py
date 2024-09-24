from django.db import models
from django.contrib.auth.models import User


class Image(models.Model):
    url = models.CharField(max_length=255)


class Profile(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE, to_field='username', db_column='username')
    bio = models.TextField(null=True, blank=True)
    profile_picture = models.ForeignKey(Image, null=True, blank=True, on_delete=models.DO_NOTHING, db_column="profile_picture_url")
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank='True')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def str(self):
        return self.username


class Label(models.Model):
    type = models.TextField()
    value = models.TextField()

    def str(self):
        return f"Label {self.value} of type {self.type}"


class Post(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, editable=False)
    title = models.CharField(max_length=50)
    content = models.TextField(max_length=600)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    labels = models.ManyToManyField(Label, blank='True')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Bookmark(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    posts = models.ManyToManyField(Post, blank='True')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bookmark collection of {self.profile.user.username}"


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
