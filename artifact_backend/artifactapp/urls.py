from django.urls import path
from .views import *

urlpatterns = [
    path('signup', SignupView.as_view(), name='signup'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path("", HealthView.as_view(), name="health"),
    path('search', artwork_search, name='artwork_search'),

    path('posts', PostListCreate.as_view(), name='post_list'),
    path('posts/<int:pk>', PostRetrieveUpdateDestroy.as_view(), name='post_detail'),
    path('posts/<str:username>', UserPostsList.as_view(), name='user_posts_list'),

    path('profiles', ProfileList.as_view(), name='profile_list'),
    path('profiles/<int:pk>', ProfileRetrieveUpdateDestroy.as_view(), name='profile_detail'),
    path('follow', FollowView.as_view(), name='follow'),
    path('profiles/<int:profile_id>/followers', FollowersListView.as_view(), name='followers_list'),
    path('profiles/<int:profile_id>/following', FollowingListView.as_view(), name='following_list'),

    path('posts/<int:pk>/likes', LikeListCreate.as_view(), name='like_list'),
    path('posts/<int:pk>/like_count', LikeCountView.as_view(), name='like_count'),
    path('likes/<int:pk>', LikeRetrieveDestroy.as_view(), name='like_detail'),
    path('likes/<str:username>', UserLikesList.as_view(), name='user_likes_list'),

    path('posts/<int:pk>/comments', CommentListCreate.as_view(), name='comment_list'),
    path('comments/<int:pk>', CommentRetrieveUpdateDestroy.as_view(), name='comment_detail'),
    path('comments/<str:username>', UserCommentsList.as_view(), name='user_comments_list'),

    path('images', ImageListCreate.as_view(), name='image_list'),
    path('images/<int:pk>', ImageRetrieveUpdateDestroy.as_view(), name='image_detail'),

    path('labels', LabelListCreateView.as_view(), name='label_list'),
    path('labels/<int:pk>', LabelDetailView.as_view(), name='label_detail'),
    path('bookmarks', BookmarkListCreateView.as_view(), name='bookmark_list-create'),
    path('bookmarks/<int:pk>', BookmarkDetailView.as_view(), name='bookmark_detail'),
    path('bookmarks/<str:username>', UserBookmarkListView.as_view(), name='user_bookmark'),

]
