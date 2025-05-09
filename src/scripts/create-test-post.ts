import { sql } from '@vercel/postgres';

async function main() {
    try {
        const result = await sql`
      INSERT INTO blog_posts (
        title,
        slug,
        content,
        excerpt,
        featured_image,
        author,
        status,
        meta_description,
        meta_keywords
      ) VALUES (
        'The Mental Game of Golf: A Beginner''s Guide',
        'mental-game-golf-beginners-guide',
        'Golf is as much a mental game as it is physical. In fact, many would argue that the mental aspect is even more crucial to success on the course.

## Understanding the Mental Game

The mental game in golf encompasses several key areas:

1. **Focus and Concentration**
   - Staying present in the moment
   - Avoiding distractions
   - Maintaining routine

2. **Emotional Control**
   - Managing frustration
   - Staying calm under pressure
   - Accepting outcomes

3. **Course Strategy**
   - Making smart decisions
   - Risk management
   - Playing to your strengths

## Tips for Improving Your Mental Game

1. **Practice Mindfulness**
   Take deep breaths before each shot and stay focused on the present moment.

2. **Develop a Pre-Shot Routine**
   Create a consistent routine that helps you prepare mentally and physically for each shot.

3. **Visualize Success**
   Before each shot, visualize the ball flight and outcome you want to achieve.

Remember, the mental game is something you can practice and improve, just like your swing!',
        'Discover how to improve your mental game and lower your scores with these essential tips for golfers of all levels.',
        '/images/blog/mental-game.jpg',
        'Sean Fagan',
        'published',
        'Learn how to master the mental aspects of golf with tips from Sean Fagan Golf Academy',
        'golf, mental game, golf psychology, golf tips, beginner golf, golf strategy'
      )
      RETURNING id;
    `;

        console.log('Test blog post created successfully!', result);
    } catch (error) {
        console.error('Failed to create test blog post:', error);
        process.exit(1);
    }
}

main(); 