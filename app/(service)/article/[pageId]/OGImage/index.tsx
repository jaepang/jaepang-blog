interface Props {
  title: string
  cover?: string
  tags: {
    id: string
    name: string
    color: string
  }[]
}

export default function OGImage({ title, cover, tags }: Props) {
  // TODO: host should be dynamic
  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://jaepang-blog.vercel.app'
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: cover
          ? `url(${cover})`
          : 'linear-gradient(64.46deg, #E088B9 13.53%, rgba(224, 136, 185, 0.85) 47.04%, rgba(224, 136, 185, 0.32) 96.51%)',
        backgroundSize: '1200px 600px',
      }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '0 64px',
          display: 'flex',
          alignItems: 'center',
          background:
            'linear-gradient(104.04deg, #FFFFFF 0%, rgba(255, 255, 255, 0.9) 55%, rgba(255, 255, 255, 0.0103092) 100%)',
          /* not working
          backdropFilter: 'saturate(180%) blur(5px)',
          */
        }}>
        <div
          style={{
            width: '73%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <div
            style={{
              marginBottom: '32px',
              lineHeight: 1.1,
              fontSize: '75px',
              fontWeight: '900',
              // css variables not work
              color: '#37352f',
            }}>
            {title}
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: '10px',
              alignItems: 'center',
            }}>
            {tags.map(tag => (
              <div
                key={tag.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '24px',
                  color: '#fff',
                  backgroundColor: '#E088B9',
                }}>
                {tag.name}
              </div>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line */}
        <img
          style={{
            width: '27%',
            objectFit: 'cover',
          }}
          src={`${host}/logo/logo.png`}
          alt="jaepang"
        />
      </div>
    </div>
  )
}
