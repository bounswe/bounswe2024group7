from django.test import TestCase
from django.db import connection
from artifactapp.models import Image, Profile, Post, Collection, Like
from artifactapp.models import Comment, Label, Notification

# Create your tests here.

class DatabaseTest(TestCase):
    def test_database_connection(self):
        self.assertTrue(connection.connection is not None)

     def setUp(self):
        self.image = Image.objects.create(url = "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg")
        self.profile = Profile.objects.create(username = "db_akkoc", bio = None, profile_picture = None, followers = None)
        self.post = Post.objects.create(profile = self.profile, title = "The Starry Night", content = "What a wonderful image!", image = self.image) 
        self.collection = Collection.objects.create(name = "Cubist Paintings", profile = self.profile, posts = self.post)
        self.like = Like.objects.create(post = self.post, profile = self.profile)
        self.comment = Comment.objects.create(post = self.post, profile = self.profile, content = "I love Cubism!")
        self.label = Label.objects.create(name = "Cubist Oil", type = "system", material = "oil paint", genre = "Cubism", is_own_artwork = False)

    def test_image(self):
        image = Image.objects.get(url="https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg")
        self.assertEqual(image.url, "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg")
    
    def test_profile(self):
        profile = Profile.objects.get(username="db_akkoc")
        self.assertEqual(profile.bio, None)
        
    def test_post(self):
        post = Post.objects.get(profile=Profile.objects.get(username="db_akkoc"))
        self.assertEqual(post.title, "The Starry Night")
        self.assertEqual(post.content, "What a wonderful image!")
        self.assertEqual(post.image, Image.objects.get(url="https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"))
    
    def test_collection(self):
        collection = Collection.objects.get(name="Cubist Paintings")
        self.assertEqual(collection.profile, Profile.objects.get(username="db_akkoc"))
        self.assertEqual(collection.posts, Post.objects.get(profile=Profile.objects.get(username="db_akkoc")))

    def test_like(self):
        like = Like.objects.get(post=Post.objects.get(profile=Profile.objects.get(username="db_akkoc")))
        self.assertEqual(like.profile, Profile.objects.get(username="db_akkoc"))

    def test_comment(self):
        comment = Comment.objects.get(post=Post.objects.get(profile=Profile.objects.get(username="db_akkoc")))
        self.assertEqual(comment.profile, Profile.objects.get(username="db_akkoc"))
        self.assertEqual(comment.content, "I love Cubism!")


    def test_label(self):
        label = Label.objects.get(name="Cubist Oil")
        self.assertEqual(label.type, "system")
        self.assertEqual(label.material, "oil paint")
        self.assertEqual(label.genre, "Cubism")
        self.assertEqual(label.is_own_artwork, False)
