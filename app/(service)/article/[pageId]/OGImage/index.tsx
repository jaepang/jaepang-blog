interface Props {
  title: string
  cover: string
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
        background: `url(${cover})`,
        backgroundSize: '1200px 600px',
      }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '0 64px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
              fontWeight: 'bolder',
              color: 'var(--color-text-default)',
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
                  borderRadius: '10px',
                  fontSize: '24px',
                  color: '#fff',
                  backgroundColor: '#E088B9',
                }}>
                {tag.name}
              </div>
            ))}
          </div>
        </div>
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
