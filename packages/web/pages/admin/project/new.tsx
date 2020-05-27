import ProjectEditor from 'components/Admin/ProjectEditor'
import { LoggedInUserDocument, NewProjectInput } from 'generated/graphql'
import { withApollo } from 'libs/apollo'
import { NextPage } from 'next'
import { Cookie, withCookie, WithCookieProps } from 'next-cookie'
import withRouter, { WithRouterProps } from 'next/dist/client/with-router'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Props extends WithRouterProps, WithCookieProps {
  currentUser: {
    username: string
  }
}

//@ts-ignore
const NewProjectPage: NextPage<Props> = ({ cookie }) => {
  const router = useRouter()

  const [project, setProject] = useState<NewProjectInput>({
    title: '',
    slug: '',
    listImage: '',
    service: '',
    callToAction: '',
    content: [],
  })

  const changeHandler = ({
    name,
    value,
  }: {
    name: keyof NewProjectInput
    value: any
  }) => {
    const tempProject = { ...project }
    tempProject[name] = value
    setProject(tempProject)
  }

  const submitHandler = async () => {
    const newProject = await fetch(
      `${
        process?.env?.BASE_URL || window?.location?.origin
      }/api/projects/create`,
      {
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${(cookie as Cookie).get('auth-token')}`,
        },
      }
    ).then(r => (r.ok ? r.json() : null))
    router.push(`/project/${newProject.slug}`)
  }

  return (
    <>
      <Head>
        <title>{project.title || 'Nieuw project'} - JM</title>
      </Head>

      <ProjectEditor
        project={project}
        onChange={changeHandler}
        onSubmit={submitHandler}
      />
    </>
  )
}

//@ts-ignore
NewProjectPage.getInitialProps = async ({
  req,
  res,
  router,
  apolloClient,
}: any) => {
  const {
    data: { currentUser },
  } = await apolloClient.query({ query: LoggedInUserDocument })

  if (req && !currentUser) {
    res.writeHead(302, { Location: '/admin/login' })
    res.end()
    return
  } else if (!currentUser) {
    router.push('/admin/login')
    return
  }

  return { currentUser }
}

export default withApollo({ ssr: true })(withCookie(withRouter(NewProjectPage)))
