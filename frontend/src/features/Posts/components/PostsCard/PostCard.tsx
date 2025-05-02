import dayjs from "dayjs";
import {Card, CardActionArea, CardMedia,CardContent,Typography, Box} from "@mui/material";
import {IPostApi} from "../../../../types.s.ts";
import {BASE_URL} from "../../../../constants.ts";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import {NavLink} from "react-router-dom";

interface Props {
  post: IPostApi;
}

const PostCard: React.FC<Props> = ({post}) => {
  let imagePath: string | null = null;

  if (post.image) {
    imagePath = BASE_URL  + post.image;
  }

  return (
      <Card sx={{ display: 'flex', marginBottom: '20px', border: "2px solid #708090" }}>
        <CardActionArea sx={{ display: 'flex', alignItems: 'center' }}>
          {imagePath ? (
              <CardMedia
                  component="img"
                  sx={{ width: 160 }}
                  image={imagePath}
                  alt="preview"
              />
          ) : <span>
            <InsertPhotoOutlinedIcon sx={{
              fontSize: "30px",
              width: 160,
              height: 160,
              display: "block"
            }}/>
          </span>
          }

          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <CardContent>
              <Typography color="text.secondary">
                {dayjs(post.datetime).format("DD.MM.YYYY HH:mm")} by {post.user.username}
              </Typography>
              <Typography to={`/post/${post._id}`} gutterBottom variant="h5" component={NavLink}>
                {post.title}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
  );
};

export default PostCard;
